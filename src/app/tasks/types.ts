import { generateUUID } from "@/shared/functions";

export type Errors<TObject> = {
  [K in keyof TObject]?: { message: string } | undefined;
};

export type ErrorsDto<TDto> = {
  -readonly [K in keyof TDto]?: { message: string } | undefined;
};

export interface UserDto {
  id: string;
  name: string;
  profilePicture: string;
}

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  archived: boolean;
  closed: boolean;
  users: UserDto[];
}

export enum FilterType {
  ALL = "all",
  OPEN = "open",
  CLOSED = "closed",
  ARCHIVED = "archived",
}

class TaskTypeUtils<T extends TaskDto> {
  newObject(): TaskDto {
    return {
      archived: false,
      closed: false,
      startDate: Date.now().toString(),
      endDate: Date.now().toString(),
      description: "",
      id: generateUUID(),
      title: "",
      users: [],
    };
  }

  getName(obj: T | undefined): string {
    return obj?.title || "";
  }

  validate(obj: T, errors: Errors<T> = {}): Errors<T> {
    if (obj.title.trim().length < 3) {
      errors.title = {
        message: "Title must be content 3 characters",
      };
    }

    if (obj.description.trim().length < 3) {
      errors.description = {
        message: "Description must be content 3 caracters.",
      };
    }

    const startDate = new Date(obj.startDate);
    const endDate = new Date(obj.endDate);

    if (isNaN(startDate.getTime())) {
      errors.startDate = {
        message: "Date is not valid.",
      };
    }

    if (isNaN(endDate.getTime())) {
      errors.endDate = {
        message: "End date is ot valid.",
      };
    }

    if (!errors.startDate && !errors.endDate && startDate > endDate) {
      errors.endDate = {
        message: "End date must not greater than start date.",
      };
    }

    return errors;
  }

  private _isValid(obj: T, errors?: Errors<T>): boolean {
    errors ??= this.validate(obj);
    return Object.keys(errors).every(
      (key) => errors![key as keyof Errors<T>] === undefined,
    );
  }

  cleanAndValidate(obj: T): { values: T; errors: Errors<T> } {
    const errors = this.validate(obj);
    return this._isValid(obj, errors)
      ? { values: obj as unknown as T, errors: {} as Errors<T> }
      : { values: {} as T, errors };
  }

  hasErrors(errors?: Record<string, unknown>): boolean {
    if (!errors) return false;
    const field = Object.keys(errors).find((key) => errors[key] !== undefined);
    if (!field) return false;
    const value = (errors as ErrorsDto<Record<string, unknown>>)[field]
      ?.message;
    return !!value;
  }
}

export const taskUtils = new TaskTypeUtils();
