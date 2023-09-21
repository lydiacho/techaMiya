import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const CardGallery = ({ checkedList }: { checkedList: string[][] }) => {
  const [ref, inView] = useInView();
  const DATA = useGetMiya(inView);

  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 3) {
      alert("토큰번호는 0~999까지 검색 가능합니다");
      setSearch(e.target.value.slice(0, 3));
    }
  };

  return (
    <St.Wrapper>
      <St.TopBar>
        <St.ItemCount>
          <span>{DATA.length}</span> Items
        </St.ItemCount>
        <St.Search
          placeholder="Number"
          type="number"
          maxLength={4}
          onChange={handleChange}
          value={search}
        />
      </St.TopBar>
      <St.Container>
        {checkedList &&
          DATA.filter((miya) => {
            // 모든 필터를 순회하면서
            let flag = true;
            checkedList.forEach((filter, filterIdx) => {
              // 하나라도 false면 flag도 false
              flag =
                flag &&
                // 체크를 아무것도 안했을 때도 포함
                (filter.includes(miya.attributes[filterIdx].value) ||
                  filter.length === 0);
            });
            return flag;
          }).map((el, idx) => (
            <Card key={idx} name={el.name} image={el.image} />
          ))}
        <div ref={ref} />
      </St.Container>
    </St.Wrapper>
  );
};

export default CardGallery;

const St = {
  Wrapper: styled.main`
    width: 93rem;
    height: fit-content;
  `,
  Container: styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;

    position: relative;

    & > div {
      position: absolute;
      bottom: 0;
    }
  `,
  TopBar: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 3rem;

    width: 100%;
  `,
  ItemCount: styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.purple1};

    & > span {
      font-size: 2rem;
      color: white;
    }
  `,
  Search: styled.input`
    padding: 1.7rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.bg};

    font-size: 1.6rem;
    color: white;

    border: 0.1rem solid ${({ theme }) => theme.colors.purple1};
    border-radius: 0.3rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.purple1};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
};
