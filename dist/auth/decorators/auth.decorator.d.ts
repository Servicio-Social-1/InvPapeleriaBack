import { AvailableRoles } from '../enum/roles.enum';
export declare function Auth(guard: any, roles: AvailableRoles | AvailableRoles[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
