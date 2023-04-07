import { useState } from 'react'
import { Button, Text, Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'


function HomePage () {
    return (
        <div className="App">
         <Text textStyle="h1">asdf</Text>
         <Text textStyle="h2">asdf</Text>
         <Button variant="primary">asdf</Button>
         <Button variant="secondary">asdf</Button>
         <InputGroup>
            <Input placeholder='test' variant="outline" />
            <InputRightElement children={<InfoIcon color='red' />} />
         </InputGroup>

      </div>
    )
}

export default HomePage