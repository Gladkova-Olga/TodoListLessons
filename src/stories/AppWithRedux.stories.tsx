import React from 'react';
import { Meta, Story} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";



export default {
    title: 'TodoLists/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};