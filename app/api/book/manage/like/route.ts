import { db } from "~/lib/db";
import readUserSession from "~/lib/supabase/readUserSession";
import { LikeBookValidator } from "~/lib/validations/book/likeBook";
import { GlobalErrors } from "~/lib/validations/errorsEnums";

export async function POST(req: Request) {
  try {
    const {
      data: { session },
    } = await readUserSession();

    if (!session?.user) {
      return new Response(GlobalErrors.UNAUTHORIZED);
    }

    const body = (await req.json()) as { bookId: string };
    const { bookId } = LikeBookValidator.parse(body);

    const alreadyLiked = await db.liked_books.findFirst({
      where: { book_id: bookId, user_id: session.user.id },
      select: { book_id: true },
    });

    if (alreadyLiked) {
      await db.liked_books.delete({
        where: {
          user_id_book_id: { book_id: bookId, user_id: session.user.id },
        },
      });
    } else {
      await db.liked_books.create({
        data: { book_id: bookId, user_id: session.user.id },
      });
    }

    // on success
    return new Response(GlobalErrors.SUCCESS);
  } catch (error) {
    return new Response(GlobalErrors.SOMETHING_WENT_WRONG);
  }
}
