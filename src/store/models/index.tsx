export interface VerifyEmailPayload {
  email: string;
}

export interface VerifyEmailCodePayload {
  email: string;
  token: string | null;
  verificationCode: string;
}

export interface ResendEmailCodePayload {
  email: string;
  token: string | null;
}

export interface SignUpPayLoad {
  firstName: string;
  email: string;
  referredCodeKey?: string | null;
  agreeToPrivacyPolicy: boolean;
  token: string | null;
  source: string;
}

export interface initialReducerState {
  // API Loading states
  verifyEmailLoading: boolean;
  verifyEmailSuccess: boolean;
  verifyEmailFailure: boolean;

  verifyEmailCodeLoading: boolean;
  verifyEmailCodeSuccess: boolean;
  verifyEmailCodeFailure: boolean;

  resendEmailCodeLoading: boolean;
  resendEmailCodeSuccess: boolean;
  resendEmailCodeFailure: boolean;

  signupLoading: boolean;
  signupSuccess: boolean;
  signupFailure: boolean;

  // Data
  isLogin: boolean | null;
  email: string | null;
  wrongEmailTokenCount: number;
  resendEmailTokenCount: number;
  emailVerifiedStatus: boolean;
  emailTokenVerifiedStatus: boolean;
  userDetails : User | null;
}

export interface ApiResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj: Results;
  results: Results;
}

export interface SignupSuccessResponse {
  isLogin: boolean;
  userDetails : User | null;
}

export interface Results {
  wrongEmailTokenCount: number;
  resendEmailTokenCount: number;
  token: number;
  isLogin: boolean;
  user: User;
}

export interface Version {
  minimum: number;
  current: number;
}

export interface User {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  email: string;
  emailVerified: boolean;
  investmentSubscribed: boolean;
  rewards: number;
  nextGoal: number;
  referralToken: string;
  referralMessage: string;
  referralCount: number;
  badges: any[];
  onboardingStatus: string;
  status: { [key: string]: boolean };
  kycDetails: KycDetails;
  token: string;
  nextLesson: NextLesson;
  hasMadeInvestments: boolean;
  isMandateApproved: boolean;
  rewardKeys: any[];
  walkThrough: { [key: string]: boolean };
  hasAnsweredQuestions: boolean;
  unsubscribe: any[];
  profession: string;
  expertise: string;
  privacy: Privacy;
}

export interface KycDetails {}

export interface NextLesson {
  lesson: Lesson;
  module: Module;
}

export interface Lesson {
  active: boolean;
  _id: string;
  title: string;
  position: number;
  cards: Card[];
}

export interface Card {
  id: string;
  position: number;
  type: string;
}

export interface Module {
  _id: string;
  title: string;
  position: number;
  rewards: number;
}

export interface Privacy {
  emailPrivacy: string;
  professionPrivacy: string;
  locationPrivacy: string;
}
