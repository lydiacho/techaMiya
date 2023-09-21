import { styled } from "styled-components";
import Card from "./Card";
import useGetMiya from "../hooks/useGetMiya";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { MetaDataType } from "../types/NftType";

const CardGallery = ({ checkedList }: { checkedList: string[][] }) => {
  const [ref, inView] = useInView();
  const DATA = useGetMiya();
  const [data, setData] = useState<MetaDataType[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  const [search, setSearch] = useState("");

  // 무한스크롤
  const [page, setPage] = useState(1);

  // 데이터 띄우기
  useEffect(() => {
    DATA && setData(DATA);
  }, [DATA]);

  useEffect(() => {
    setData(
      //검색창 %search% 검색 (아무것도 입력안하면 전체)
      DATA.filter((miya) => search === "" || miya.name.includes(search))
        // 모든 필터를 순회하면서 한 필터에 대해서라도 false면 flag도 false
        .filter((miya) => {
          let flag = true;
          for (let i = 0; i < 13; i++) {
            flag =
              flag &&
              (checkedList[i].length === 0 ||
                checkedList[i].includes(miya.attributes[i].value));
          }
          return flag;
        })
    );

    if (containerRef.current) {
      containerRef.current.classList.add("animation");
      setTimeout(() => {
        containerRef.current &&
          containerRef.current.classList.remove("animation");
      }, 1000);
    }
  }, [search, checkedList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 3) {
      setSearch(e.target.value.slice(0, 3));
    }
  };

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <St.Wrapper>
      <St.TopBar>
        <St.ItemCount>
          <span>{data.length}</span> Items
        </St.ItemCount>
        <St.Search
          placeholder="Number"
          type="number"
          onChange={handleChange}
          value={search}
        />
      </St.TopBar>
      <St.Container ref={containerRef}>
        {data
          // 9개씩 쪼개서 렌더링
          .filter((_, idx) => idx < 9 * page)
          .map((el, idx) => (
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

    &.animation {
      animation: fadein 1.5s;
      -webkit-animation: fadein 1.5s; /* Safari and Chrome */

      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
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
