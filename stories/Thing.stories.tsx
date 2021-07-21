import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Gridderer, Props } from '../src'

const meta: Meta = {
  title: 'Welcome',
  component: Gridderer,
  argTypes: {
   
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<Props> = args => <Gridderer {...args} />

export const Default = Template.bind({})

Default.args = {}
