import { User } from "src/entities/user.entity";
declare const SignUpDto_base: import("@nestjs/common").Type<Pick<User, "email" | "password" | "nickname" | "phone">>;
export declare class SignUpDto extends SignUpDto_base {
    passwordCheck: string;
}
export {};
