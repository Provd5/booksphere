"use server";

import { revalidatePath } from "next/cache";

import { type GetProfileInterface } from "~/types/data/profile";
import { type GetDataList } from "~/types/list";
import {
  SortFollowProfilesArray,
  SortProfilesArray,
} from "~/types/orderArrays";
import {
  type SortFollowProfilesType,
  type SortProfilesType,
} from "~/types/sort";

import ROUTES from "~/utils/routes";
import { sortParamsValidator } from "~/utils/sortParamsValidator";

import { db } from "../db";
import { errorHandler } from "../errorHandler";
import readUserSession from "../supabase/readUserSession";
import { totalPages } from "../utils/totalPages";
import { transformProfileData } from "../utils/transformProfileData";
import { ErrorsToTranslate } from "../validations/errorsEnums";
import { UuidValidator } from "../validations/others";
import { EditProfileValidator } from "../validations/profile";

const itemsPerPage = 20;

const profileSelector = (userId: string | undefined) => {
  return {
    _count: {
      select: {
        followed_by: true,
        following: true,
        book_owned_as: {
          where: {
            NOT: {
              AND: [
                { added_audiobook_at: null },
                { added_book_at: null },
                { added_ebook_at: null },
              ],
            },
          },
        },
        bookshelf: true,
        liked_book: true,
        review: true,
      },
    },
    ...(userId
      ? {
          followed_by: {
            where: {
              follower_id: userId,
            },
          },
        }
      : {}),
  };
};

export async function getProfileQuantity(q?: string): Promise<number> {
  try {
    const quantity = await db.profile.count({
      where: {
        private: { not: true },
        full_name: {
          not: null,
          ...(q ? { contains: q, mode: "insensitive" } : {}),
        },
      },
    });

    return quantity;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getAllProfiles(
  searchParams: unknown,
  q?: string
): Promise<GetDataList<GetProfileInterface>> {
  const validSearchParams = sortParamsValidator(
    searchParams,
    SortProfilesArray
  );
  const { order, orderBy: defaultOrderBy, page } = validSearchParams;
  const orderBy = defaultOrderBy as SortProfilesType;

  try {
    const {
      data: { session },
    } = await readUserSession();

    const [allItems, profiles] = await Promise.all([
      getProfileQuantity(q),
      db.profile.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy:
          orderBy === "activity"
            ? [
                { review: { _count: order } },
                { review_reaction: { _count: order } },
                { followed_by: { _count: order } },
                { following: { _count: order } },
                { book_owned_as: { _count: order } },
                { bookshelf: { _count: order } },
                { liked_book: { _count: order } },
              ]
            : orderBy === "books_on_shelves"
            ? { bookshelf: { _count: order } }
            : orderBy === "followers"
            ? { followed_by: { _count: order } }
            : orderBy === "owned_books"
            ? { book_owned_as: { _count: order } }
            : orderBy === "reviews"
            ? { review: { _count: order } }
            : { [orderBy]: order },
        where: {
          private: { not: true },
          full_name: {
            not: null,
            ...(q ? { contains: q, mode: "insensitive" } : {}),
          },
        },
        include: profileSelector(session?.user.id),
      }),
    ]);

    const transformedData = profiles.map((profile) =>
      transformProfileData(!!session, profile)
    );

    return {
      page,
      totalPages: totalPages(allItems, itemsPerPage),
      allItems,
      itemsPerPage:
        profiles.length < itemsPerPage ? profiles.length : itemsPerPage,
      data: transformedData,
    };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getSessionProfile(): Promise<GetProfileInterface | null> {
  try {
    const {
      data: { session },
    } = await readUserSession();

    const profile =
      session &&
      (await db.profile.findUnique({
        where: { id: session.user.id },
        include: profileSelector(session?.user.id),
      }));

    if (!profile) return null;

    const transformedData = transformProfileData(!!session, profile);

    return transformedData;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getProfile(
  profileName: string
): Promise<GetProfileInterface | null> {
  const decodedProfileName = decodeURIComponent(profileName);

  try {
    const {
      data: { session },
    } = await readUserSession();

    const profile = await db.profile.findUnique({
      where: { full_name: decodedProfileName },
      include: profileSelector(session?.user.id),
    });

    if (!profile) return null;

    const transformedData = transformProfileData(!!session, profile);

    return transformedData;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getProfileFromId(
  profileId: string
): Promise<GetProfileInterface | null> {
  try {
    const {
      data: { session },
    } = await readUserSession();

    const profile = await db.profile.findUnique({
      where: { id: profileId },
      include: profileSelector(session?.user.id),
    });

    if (!profile) return null;

    const transformedData = transformProfileData(!!session, profile);

    return transformedData;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getFollowQuantity(
  profileName: string,
  variant: "follower" | "following"
): Promise<number> {
  const decodedProfileName = decodeURIComponent(profileName);

  try {
    const quantity = await db.profile.count({
      where:
        variant === "follower"
          ? {
              following: {
                some: { following: { full_name: decodedProfileName } },
              },
              full_name: { not: null },
            }
          : {
              followed_by: {
                some: { follower: { full_name: decodedProfileName } },
              },
              full_name: { not: null },
            },
    });

    return quantity;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function getFollowProfiles(
  profileName: string,
  variant: "follower" | "following",
  searchParams: unknown
): Promise<GetDataList<GetProfileInterface>> {
  const decodedProfileName = decodeURIComponent(profileName);

  const validSearchParams = sortParamsValidator(
    searchParams,
    SortFollowProfilesArray
  );
  const { order, orderBy: defaultOrderBy, page } = validSearchParams;
  const orderBy = defaultOrderBy as SortFollowProfilesType;

  try {
    const {
      data: { session },
    } = await readUserSession();

    const [allItems, profiles] = await Promise.all([
      getFollowQuantity(decodedProfileName, variant),
      db.follows.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy:
          orderBy === "activity"
            ? [
                { [variant]: { review: { _count: order } } },
                { [variant]: { review_reaction: { _count: order } } },
                { [variant]: { followed_by: { _count: order } } },
                { [variant]: { following: { _count: order } } },
                { [variant]: { book_owned_as: { _count: order } } },
                { [variant]: { bookshelf: { _count: order } } },
                { [variant]: { liked_book: { _count: order } } },
              ]
            : orderBy === "books_on_shelves"
            ? { [variant]: { bookshelf: { _count: order } } }
            : orderBy === "followers"
            ? { [variant]: { followed_by: { _count: order } } }
            : orderBy === "owned_books"
            ? { [variant]: { book_owned_as: { _count: order } } }
            : orderBy === "reviews"
            ? { [variant]: { review: { _count: order } } }
            : orderBy === "last_added"
            ? { updated_at: order }
            : { [variant]: { [orderBy]: order } },
        where:
          variant === "follower"
            ? {
                following: { full_name: decodedProfileName },
                follower: { full_name: { not: null } },
              }
            : {
                follower: { full_name: decodedProfileName },
                following: { full_name: { not: null } },
              },
        select: {
          [variant]: {
            include: profileSelector(session?.user.id),
          },
        },
      }),
    ]);

    const transformedData = profiles.map((profile) =>
      transformProfileData(!!session, profile[variant])
    );

    return {
      page,
      totalPages: totalPages(allItems, itemsPerPage),
      allItems,
      itemsPerPage:
        profiles.length < itemsPerPage ? profiles.length : itemsPerPage,
      data: transformedData,
    };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function postFollow(
  profileId: unknown
): Promise<{ success: boolean }> {
  try {
    const {
      data: { session },
    } = await readUserSession();

    if (!session?.user) {
      throw new Error(ErrorsToTranslate.UNAUTHORIZED);
    }

    const validProfileId = UuidValidator.parse(profileId);
    if (session.user.id === validProfileId) {
      throw new Error(ErrorsToTranslate.FOLLOW.CANNOT_FOLLOW_OWN_PROFILE);
    }

    const alreadyFollowed = await db.follows.findFirst({
      where: {
        follower: { id: session.user.id },
        following: { id: validProfileId },
      },
    });

    if (alreadyFollowed) {
      await db.follows.delete({
        where: {
          follower_id_following_id: {
            follower_id: session.user.id,
            following_id: validProfileId,
          },
        },
      });
    } else {
      await db.follows.create({
        data: {
          follower_id: session.user.id,
          following_id: validProfileId,
        },
      });
    }

    // on success
    revalidatePath(ROUTES.profile.session_profile, "page");
    return { success: true };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}

export async function editProfile(
  formData: unknown
): Promise<{ success: boolean }> {
  try {
    const {
      data: { session },
    } = await readUserSession();

    if (!session?.user) {
      throw new Error(ErrorsToTranslate.UNAUTHORIZED);
    }

    const validFormData = EditProfileValidator.parse(formData);
    const isUsernameExists = await db.profile.count({
      where: {
        AND: [
          {
            full_name: { equals: validFormData.username, mode: "insensitive" },
            id: { not: session.user.id },
          },
        ],
      },
    });

    if (isUsernameExists > 0) {
      throw new Error(ErrorsToTranslate.EDIT_PROFILE.USERNAME_ALREADY_EXISTS);
    }

    await db.profile.update({
      where: {
        id: session.user.id,
      },
      data: {
        full_name: validFormData.username,
        description: validFormData.description,
        private: validFormData.private,
      },
    });

    // on success
    revalidatePath(ROUTES.profile.root(validFormData.username));
    return { success: true };
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}
