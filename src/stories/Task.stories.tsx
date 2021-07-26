import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../task";


export default {
    title: 'TodoLists/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Change task status clicked');
const changeTaskTitleCallback = action('Change task title clicked');
const removeTaskCallback = action('Remove task  clicked');
const baseArg = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: "1", title: "JS", isDone: true},
    todoListID: "todoListID1",
    ...baseArg
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: "2", title: "CSS", isDone: false},
    todoListID: "todoListID2",
    ...baseArg
};

