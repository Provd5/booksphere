import { revalidatePath } from "next/cache";

import { type OwnedAsType } from "~/types/CategoryTypes";

import { db } from "~/lib/db";
import readUserSession from "~/lib/supabase/readUserSession";
import { OwnedAsValidator } from "~/lib/validations/book/ownedAs";
import { GlobalErrors } from "~/lib/validations/errorsEnums";

export async function POST(req: Request) {
  try {
    const {
      data: { session },
    } = await readUserSession();

    if (!session?.user) {
      return new Response(GlobalErrors.UNAUTHORIZED);
    }

    const body = (await req.json()) as {
      formData: { bookId: string; ownedAs: OwnedAsType };
    };
    const { formData } = OwnedAsValidator.parse(body);

    const ownedAsTypeToManage = `added_${formData.ownedAs.toLowerCase()}_at`;

    const ownedAsData = await db.book_owned_as.findFirst({
      where: { book_id: formData.bookId, user_id: session.user.id },
      select: { [ownedAsTypeToManage]: true },
    });

    const ownedAsExists =
      !!ownedAsData?.added_audiobook_at ||
      !!ownedAsData?.added_book_at ||
      !!ownedAsData?.added_ebook_at;

    await db.book_owned_as.upsert({
      where: {
        user_id_book_id: {
          book_id: formData.bookId,
          user_id: session.user.id,
        },
      },
      update: {
        [ownedAsTypeToManage]: ownedAsExists ? null : new Date(),
      },
      create: {
        book_id: formData.bookId,
        user_id: session.user.id,
        [ownedAsTypeToManage]: new Date(),
      },
    });

    // on success
    revalidatePath("/", "layout");
    return new Response(GlobalErrors.SUCCESS);
  } catch (error) {
    return new Response(GlobalErrors.SOMETHING_WENT_WRONG);
  }
}
