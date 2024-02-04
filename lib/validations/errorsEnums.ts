export enum GlobalErrors {
  SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG",
  COULD_NOT_FETCH = "COULD_NOT_FETCH",
  UNAUTHORIZED = "UNAUTHORIZED",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
}

export enum SearchErrors {
  SEARCH_TEXT_TOO_SHORT_2 = "SEARCH_TEXT_TOO_SHORT_2",
}

export enum AuthErrors {
  EMAIL_EXISTS = "EMAIL_EXISTS",
  USERNAME_EXISTS = "USERNAME_EXISTS",
  NOT_THE_SAME_PASSWORDS = "NOT_THE_SAME_PASSWORDS",
}

export enum SupabaseValidatorErrors {
  DISABLED_SIGNUPS_ERROR = "Email signups are disabled",
  EMAIL_LINK_ERROR = "Email link is invalid or has expired",
  TOKEN_ERROR = "Token has expired or is invalid",
  LOGIN_ERROR = "Invalid login credentials",
  EMAIL_NOT_CONFIRMED = "Email not confirmed",
  CAPTCHA_ERROR = "captcha verification process failed",
}

export enum LoginValidatorErrors {
  WRONG_EMAIL = "WRONG_EMAIL",
  PASSWORD_REQUIRED_ERROR = "PASSWORD_REQUIRED_ERROR",
}

export enum SignupValidatorErrors {
  WRONG_EMAIL = "WRONG_EMAIL",
  WRONG_PASSWORD = "WRONG_PASSWORD",
}

export enum UsernameValidatorErrors {
  USERNAME_TOO_SHORT_3 = "USERNAME_TOO_SHORT_3",
  USERNAME_TOO_LONG_32 = "USERNAME_TOO_LONG_32",
  WRONG_USERNAME = "WRONG_USERNAME",
  SAME_USERNAME = "SAME_USERNAME",
}

export enum DescriptionValidatorErrors {
  DESCRIPTION_TOO_LONG_5000 = "DESCRIPTION_TOO_LONG_5000",
}

export enum CreateReviewValidatorErrors {
  REVIEW_REQUIRED = "REVIEW_REQUIRED",
  REVIEW_TOO_LONG_5000 = "REVIEW_TOO_LONG_5000",
  WRONG_RATE = "WRONG_RATE",
}
