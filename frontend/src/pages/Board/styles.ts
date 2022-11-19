import styled from 'styled-components';

interface ContainerProps {
  width: number;
  height: number;
  pixelSize: string;
  color: string;
}
interface PixelProps {
  pixelSize: string;
  color: string;
  posX: number;
  posY: number;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: ${({ pixelSize, height }) => `calc(${pixelSize} * ${height})`};
  width: ${({ pixelSize, width }) => `calc(${pixelSize} * ${width})`};
  background-color: ${({ color }) => `${color}`};
  border: black solid 1px;
`;

export const Line = styled.div``;

export const Sqm = styled.div<PixelProps>`
  position: absolute;
  height: ${({ pixelSize }) => `${pixelSize}`};
  width: ${({ pixelSize }) => `${pixelSize}`};
  left: ${({ pixelSize, posX }) => `calc(${pixelSize} * ${posX})`};
  top: ${({ pixelSize, posY }) => `calc(${pixelSize} * ${posY})`};
  background-color: ${({ color }) => `${color}`};
`;
