import styled from 'styled-components';

interface PixelProps {
  props: {
    height: number;
    width: number;
    color: string;
  };
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Line = styled.div``;

export const Pixel = styled.div<PixelProps>`
  height: ${({ props }) => `${props.height}px`};
  width: ${({ props }) => `${props.width}px`};
  background-color: ${({ props }) => `${props.color}`};
`;
