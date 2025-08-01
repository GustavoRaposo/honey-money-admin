import React from 'react';
import styled from 'styled-components';

const SuccessMessageWrapper = styled.div`
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid #4caf50;
  color: #4caf50;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

export const SuccessMessage: React.FC<{ message: string }> = ({ message }) => (
  <SuccessMessageWrapper>
    {message}
  </SuccessMessageWrapper>
);