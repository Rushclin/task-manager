"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { TaskDto, taskUtils, UserDto } from "../types";
import { TextField } from "@/components/Inputs/TextField";
import UserPicker from "@/components/Inputs/UserPicker";
import {
  GithubApiUser,
  mapApiUserToUserDto,
} from "@/shared/mapGithubUserToUserDto";
import { Button } from "@/components/Button";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTask";

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const [selectedUsers, setSelectedUsers] = React.useState<UserDto[]>([]);
  const [userList, setUserList] = React.useState<UserDto[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { dispatch } = useTasks();

  React.useEffect(() => {
    getUserListFromGithub();
  }, []);

  const getUserListFromGithub = async () => {
    await fetch("https://api.github.com/search/users?q=type%3Auser")
      .then((result) => result.json())
      .then((response) => {
        const items = response.items as GithubApiUser[];
        const users = items.map(mapApiUserToUserDto);
        setUserList(users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const f = useForm({
    mode: "all",
    defaultValues: taskUtils.newObject(),
    resolver: (value) => taskUtils.cleanAndValidate(value),
  });

  const {
    control,
    formState,
    handleSubmit,
    formState: { errors },
  } = f;

  const onSubmit = (task: TaskDto) => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { users: _users, ...rest } = task;
    const taskWithUserList: TaskDto = { users: selectedUsers, ...rest };
    setLoading(true);
    try {
      dispatch({ type: "ADD_TASK", payload: taskWithUserList });
      f.reset(taskUtils.newObject());
      setSelectedUsers([]);
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        control={control}
        formState={formState}
        name="title"
        label="Title of task"
        placeholder="Enter title of task"
        inputMode="text"
        required
      />

      <TextField
        control={control}
        formState={formState}
        name="description"
        label="Description of task"
        placeholder="Enter description of task"
        inputMode="text"
        required
      />

      <div className="flex justify-between gap-3">
        <TextField
          control={control}
          formState={formState}
          name="startDate"
          label="Start date"
          placeholder="Enter start date of task"
          type="datetime-local"
          required
        />
        <TextField
          control={control}
          formState={formState}
          name="endDate"
          label="End date"
          placeholder="Enter end date of task"
          type="datetime-local"
          required
        />
      </div>

      <UserPicker
        users={userList}
        selectedUsers={selectedUsers}
        onChange={setSelectedUsers}
      />

      <div className="flex justify-end space-x-4">
        <Button
          label="Close"
          onClick={() => onClose()}
          variant="danger"
          className="bg-danger"
          type="reset"
        />

        <Button
          label="Create task"
          disabled={taskUtils.hasErrors(errors)}
          type="submit"
          loading={loading}
          onClick={() => {}}
          icon={<Plus size={16} color="#3d60eb" absoluteStrokeWidth />}
        />
      </div>
    </form>
  );
};

export default TaskForm;
