export interface signupSchemaDictionary {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
  defaultError: string;
  passwords_not_match: string;
}

export interface loginSchemaDictionary {
  phone: string;
  password: string;
  defaultError: string;
}

export interface changePasswordSchemaDictionary {
  otp: string;
  password: string;
  password_confirmation: string;
  defaultError: string;
  passwords_not_match: string;
}

export interface resetPasswordSchemaDictionary {
  phone: string;
  defaultError: string;
}
