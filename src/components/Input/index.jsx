import React from 'react'
import { Controller } from "react-hook-form";

import { InputContainer, InputText, IconContainer, ErrorText } from './styles'; // Adicione o ErrorText no styles

const Input = ({ leftIcon, name, control, error, ...rest }) => {
  return (
    <InputContainer>
        {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <InputText {...field} {...rest} />
              {error && <ErrorText>{error.message}</ErrorText>}
            </>
          )}
        />
    </InputContainer>
  )
}

export { Input };
