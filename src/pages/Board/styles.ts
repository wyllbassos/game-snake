import styled from 'styled-components';

interface ContainerProps {
  width: number;
  height: number;
}
interface PixelProps {
  props: {
    size: string;
    color: string;
  };
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.width}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.height}, 1fr)`};
`;

export const Line = styled.div``;

export const Frame = styled.div<PixelProps>`
  height: ${({ props }) => `${props.size}`};
  width: ${({ props }) => `${props.size}`};
  background-color: ${({ props }) => `${props.color}`};
`;
