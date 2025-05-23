export interface LoginData {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordData {
  phone: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyOtpData {
  phone: string;
  otp: string;
}

export interface RequestPasswordResetData {
  phone: string;
}

export interface AuthCustomer {
  id: number;
  name: string;
  country_code: string;
  phone: string;
}

//
// Response interfaces for each endpoint
//
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    customer: AuthCustomer;
    token: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    customer: AuthCustomer;
  };
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    customer: AuthCustomer;
    token: string;
  };
}

export interface RequestPasswordResetResponse {
  success: boolean;
  message: string;
  data: [];
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data: [];
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data: [];
}

export interface getUserResponse {
  success: boolean;
  message: string;
  data: AuthCustomer;
}
