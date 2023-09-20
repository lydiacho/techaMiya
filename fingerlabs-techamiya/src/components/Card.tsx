import { styled } from "styled-components";

const Card = ({ name, image }: { name: string; image: string }) => {
  return (
    <St.Wrapper>
      <St.Image src={image} alt="NFT이미지" />
      <St.Name>{name}</St.Name>
    </St.Wrapper>
  );
};

export default Card;

const St = {
  Wrapper: styled.article`
    display: flex;
    flex-direction: column;
    width: 29rem;
    border-radius: 0.8rem;

    overflow: hidden;
  `,
  Image: styled.img`
    background-color: gray;
    width: 100%;
    height: 29rem;
  `,
  Name: styled.h2`
    padding: 2rem 2.4rem;
    background-color: ${({ theme }) => theme.colors.purple2};
    font-size: 2rem;
    text-align: start;
  `,
};
