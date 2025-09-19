export interface IError {
  code: string;
  message: string;
}

enum MessageConstantKey {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  PAGE_NOT_FOUND = "PAGE_NOT_FOUND",
  ERROR_TRIEVING_KEYS = "ERROR_TRIEVING_KEYS",
  FORBIDDEN_ERROR = "FORBIDDEN_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN_COMPANY_LOGIN = "FORBIDDEN_COMPANY_LOGIN",
  FORBIDDEN_LEASE_LOGIN = "FORBIDDEN_LEASE_LOGIN",
  FORBIDDEN_TRANSLATOR_LOGIN = "FORBIDDEN_TRANSLATOR_LOGIN",
  UNAUTHORIZED_LOGIN_FACEBOOK_REQUIRE_EMAIL = "UNAUTHORIZED_LOGIN_FACEBOOK_REQUIRE_EMAIL",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  REGISTER_FAILED = "REGISTER_FAILED",
  CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED",
  CHANGE_PROPERTY_ID_FAILED = "CHANGE_PROPERTY_ID_FAILED",
  RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED",
  INCORRECT_EMAIL_OR_PASSWORD = "INCORRECT_EMAIL_OR_PASSWORD",
  INVALID_VERIFICATION_CODE = "INVALID_VERIFICATION_CODE",
  LOGIN_OAUTH2_FAIL = "LOGIN_OAUTH2_FAIL",
  CHANGE_CREDENTIAL_NOT_CORRECT = "CHANGE_CREDENTIAL_NOT_CORRECT",
  EMAIL_DOES_NOT_EXIST = "EMAIL_DOES_NOT_EXIST",
  RESET_PASSWORD_INCORRECT_CODE = "RESET_PASSWORD_INCORRECT_CODE",
  EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE",
  PASSWORD_FIELDS_MUST_MATCH = "PASSWORD_FIELDS_MUST_MATCH",
  USER_IS_ENABLED = "USER_IS_ENABLED",
  INCORRECT_CONFIRMATION_CODE = "INCORRECT_CONFIRMATION_CODE",
  NEW_PASSWORD_NOT_SAME_OLD_PASSWORD = "NEW_PASSWORD_NOT_SAME_OLD_PASSWORD",
  ACCOUNT_NOT_EXISTS = "ACCOUNT_NOT_EXISTS",
  ACCOUNT_BLOCKED = "ACCOUNT_BLOCKED",
  ACCOUNT_NOT_ACTIVATED = "ACCOUNT_NOT_ACTIVATED",
  TOKEN_REMOVE_ACCOUNT_EXPIRED = "TOKEN_REMOVE_ACCOUNT_EXPIRED",
  TOKEN_REMOVE_ACCOUNT_NOT_CORRECT = "TOKEN_REMOVE_ACCOUNT_NOT_CORRECT",
  FAILED_TO_VERIFY_EMAIL = "FAILED_TO_VERIFY_EMAIL",
  INVALID_TOKEN = "INVALID_TOKEN",
  EXPIRED_TOKEN = "EXPIRED_TOKEN",
  REVOKED_TOKEN = "REVOKED_TOKEN",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",
  EXPIRED_REFRESH_TOKEN = "EXPIRED_REFRESH_TOKEN",
  REVOKED_REFRESH_TOKEN = "REVOKED_REFRESH_TOKEN",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
  FOLDER_NOT_FOUND = "FOLDER_NOT_FOUND",
  PASSWORD_NOT_FOUND = "PASSWORD_NOT_FOUND",
  ADDRESS_NOT_FOUND = "ADDRESS_NOT_FOUND",
  CONTACT_NOT_FOUND = "CONTACT_NOT_FOUND",
  COUNTRY_NOT_FOUND = "COUNTRY_NOT_FOUND",
  PAYMENT_NOT_FOUND = "PAYMENT_NOT_FOUND",
  BIRD_SPECIES_NOT_FOUND = "BIRD_SPECIES_NOT_FOUND",
  BIRD_ORDER_NOT_FOUND = "BIRD_ORDER_NOT_FOUND",
  BIRD_FAMILY_NOT_FOUND = "BIRD_FAMILY_NOT_FOUND",
  BIRD_SPECIES_DELETED_SUCCESSFULLY = "BIRD_SPECIES_DELETED_SUCCESSFULLY",
  BIRD_ORDER_DELETED_SUCCESSFULLY = "BIRD_ORDER_DELETED_SUCCESSFULLY",
  BIRD_FAMILY_DELETED_SUCCESSFULLY = "BIRD_FAMILY_DELETED_SUCCESSFULLY",
}

export const MessageConstant: Record<MessageConstantKey, IError> = {
  [MessageConstantKey.INTERNAL_SERVER_ERROR]: {
    code: "ERR.SER0101",
    message: "Internal server error!",
  },
  [MessageConstantKey.PAGE_NOT_FOUND]: {
    code: "ERR.SER0102",
    message: "Page was not found!",
  },
  [MessageConstantKey.ERROR_TRIEVING_KEYS]: {
    code: "ERR.SER0103",
    message: "Error retrieving key!",
  },
  [MessageConstantKey.FORBIDDEN_ERROR]: {
    code: "ERR.AUTH0101",
    message: "Access Denied! You don’t have permission!",
  },
  [MessageConstantKey.UNAUTHORIZED]: {
    code: "ERR.AUTH0102",
    message: "You do not have permission to access this page!",
  },
  [MessageConstantKey.FORBIDDEN_COMPANY_LOGIN]: {
    code: "ERR.AUTH0201",
    message:
      "You registered a company account; log in at the recruitment service!",
  },
  [MessageConstantKey.FORBIDDEN_LEASE_LOGIN]: {
    code: "ERR.AUTH0202",
    message:
      "You registered a lessor account; log in at the real estate service!",
  },
  [MessageConstantKey.FORBIDDEN_TRANSLATOR_LOGIN]: {
    code: "ERR.AUTH0203",
    message:
      "You registered a supporter account; log in to recruitment, real estate, and visa services!",
  },
  [MessageConstantKey.UNAUTHORIZED_LOGIN_FACEBOOK_REQUIRE_EMAIL]: {
    code: "ERR.AUTH0204",
    message: "Please update your Facebook email and try again.",
  },

  // User errors
  [MessageConstantKey.USER_NOT_FOUND]: {
    code: "ERR.USE0101",
    message: "User was not found!",
  },
  [MessageConstantKey.REGISTER_FAILED]: {
    code: "ERR.USE0102",
    message: "Register failed!",
  },
  [MessageConstantKey.CHANGE_PASSWORD_FAILED]: {
    code: "ERR.USE0103",
    message: "Change password failed!",
  },
  [MessageConstantKey.CHANGE_PROPERTY_ID_FAILED]: {
    code: "ERR.USE0104",
    message: "Change property ID failed!",
  },
  [MessageConstantKey.RESET_PASSWORD_FAILED]: {
    code: "ERR.USE0105",
    message: "Reset password failed!",
  },
  [MessageConstantKey.INCORRECT_EMAIL_OR_PASSWORD]: {
    code: "ERR.USE0106",
    message: "Incorrect email or password!",
  },
  [MessageConstantKey.INVALID_VERIFICATION_CODE]: {
    code: "ERR.USE0107",
    message: "Invalid or expired verification code!",
  },
  [MessageConstantKey.LOGIN_OAUTH2_FAIL]: {
    code: "ERR.USE0108",
    message: "Incorrect email or password!",
  },
  [MessageConstantKey.CHANGE_CREDENTIAL_NOT_CORRECT]: {
    code: "ERR.USE0109",
    message: "Old password is not correct!",
  },
  [MessageConstantKey.EMAIL_DOES_NOT_EXIST]: {
    code: "ERR.USE0110",
    message: "Email does not exist!",
  },
  [MessageConstantKey.RESET_PASSWORD_INCORRECT_CODE]: {
    code: "ERR.USE0111",
    message: "Incorrect code to reset password!",
  },
  [MessageConstantKey.EMAIL_ALREADY_IN_USE]: {
    code: "ERR.USE0112",
    message: "Email already in use!",
  },
  [MessageConstantKey.PASSWORD_FIELDS_MUST_MATCH]: {
    code: "ERR.USE0113",
    message: "The password fields must match!",
  },
  [MessageConstantKey.USER_IS_ENABLED]: {
    code: "ERR.USE0114",
    message: "User is enabled!",
  },
  [MessageConstantKey.INCORRECT_CONFIRMATION_CODE]: {
    code: "ERR.USE0115",
    message: "Incorrect confirmation code!",
  },
  [MessageConstantKey.NEW_PASSWORD_NOT_SAME_OLD_PASSWORD]: {
    code: "ERR.USE0116",
    message: "The new password must not be the same as the old password!",
  },
  [MessageConstantKey.ACCOUNT_NOT_EXISTS]: {
    code: "ERR.USE0117",
    message: "Account does not exist!",
  },
  [MessageConstantKey.ACCOUNT_BLOCKED]: {
    code: "ERR.USE0118",
    message: "Your account has been locked, please contact admin!",
  },
  [MessageConstantKey.ACCOUNT_NOT_ACTIVATED]: {
    code: "ERR.USE0119",
    message: "Your account has not been activated, please confirm your email!",
  },
  [MessageConstantKey.TOKEN_REMOVE_ACCOUNT_EXPIRED]: {
    code: "ERR.USE0201",
    message: "Verification code has expired!",
  },
  [MessageConstantKey.TOKEN_REMOVE_ACCOUNT_NOT_CORRECT]: {
    code: "ERR.USE0202",
    message: "Verification code is not correct!",
  },
  [MessageConstantKey.FAILED_TO_VERIFY_EMAIL]: {
    code: "ERR.USE0203",
    message: "Failed to verify email!",
  },
  // Authentication errors
  [MessageConstantKey.INVALID_TOKEN]: {
    code: "ERR.TOK0101",
    message: "Invalid token!",
  },
  [MessageConstantKey.EXPIRED_TOKEN]: {
    code: "ERR.TOK0102",
    message: "Expired token!",
  },
  [MessageConstantKey.REVOKED_TOKEN]: {
    code: "ERR.TOK0103",
    message: "Revoked token!",
  },
  [MessageConstantKey.INVALID_REFRESH_TOKEN]: {
    code: "ERR.TOK0201",
    message: "Invalid refresh token!",
  },
  [MessageConstantKey.EXPIRED_REFRESH_TOKEN]: {
    code: "ERR.TOK0202",
    message: "Expired refresh token!",
  },
  [MessageConstantKey.REVOKED_REFRESH_TOKEN]: {
    code: "ERR.TOK0203",
    message: "Revoked refresh token!",
  },
  [MessageConstantKey.TOO_MANY_REQUESTS]: {
    code: "ERR.TOM0204",
    message: "Too many requests, please try again later",
  },
  // Session errors
  [MessageConstantKey.SESSION_EXPIRED]: {
    code: "ERR.SES0101",
    message: "Session expired!",
  },

  [MessageConstantKey.SESSION_NOT_FOUND]: {
    code: "ERR.SES0102",
    message: "Session not found!",
  },

  // Folder errors
  [MessageConstantKey.FOLDER_NOT_FOUND]: {
    code: "ERR.FOL0101",
    message: "Folder not found!",
  },

  // Password errors
  [MessageConstantKey.PASSWORD_NOT_FOUND]: {
    code: "ERR.PAS0101",
    message: "Password not found!",
  },
  [MessageConstantKey.ADDRESS_NOT_FOUND]: {
    code: "ERR.ADD0101",
    message: "Address not found!",
  },
  [MessageConstantKey.CONTACT_NOT_FOUND]: {
    code: "ERR.CON0101",
    message: "Contact not found!",
  },
  [MessageConstantKey.COUNTRY_NOT_FOUND]: {
    code: "ERR.COU0101",
    message: "Country not found!",
  },
  [MessageConstantKey.PAYMENT_NOT_FOUND]: {
    code: "ERR.PAY0101",
    message: "Payment not found!",
  },
  [MessageConstantKey.BIRD_SPECIES_NOT_FOUND]: {
    code: "ERR.BIR0101",
    message: "Bird species not found!",
  },
  [MessageConstantKey.BIRD_ORDER_NOT_FOUND]: {
    code: "ERR.BIR0102",
    message: "Bird order not found!",
  },
  [MessageConstantKey.BIRD_FAMILY_NOT_FOUND]: {
    code: "ERR.BIR0103",
    message: "Bird family not found!",
  },
  [MessageConstantKey.BIRD_SPECIES_DELETED_SUCCESSFULLY]: {
    code: "ERR.BIR0104",
    message: "Bird species has been deleted successfully!",
  },
  [MessageConstantKey.BIRD_ORDER_DELETED_SUCCESSFULLY]: {
    code: "ERR.BIR0105",
    message: "Bird order has been deleted successfully!",
  },
  [MessageConstantKey.BIRD_FAMILY_DELETED_SUCCESSFULLY]: {
    code: "ERR.BIR0106",
    message: "Bird family has been deleted successfully!",
  },
};
