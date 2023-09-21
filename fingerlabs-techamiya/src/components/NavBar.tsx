import { styled } from "styled-components";
import TRAITS from "../data/traits";
import { useState } from "react";
import NavBarFilter from "./NavBarFilter";

interface NavBarProps {
  checkedList: string[][];
  setCheckedList: React.Dispatch<React.SetStateAction<string[][]>>;
}

const NavBar = ({ checkedList, setCheckedList }: NavBarProps) => {
  const FILTER = Object.keys(TRAITS);
  const [filterOpen, setFilterOpen] = useState<boolean[]>(
    Array.from({ length: 13 }, () => false)
  );

  return (
    <St.Wrapper>
      <St.NavTitle>
        Filter
        <St.RefreshBtn
          src="src/assets/refresh.svg"
          onClick={() => location.reload()}
        />
      </St.NavTitle>
      <St.BoldLine />
      {FILTER.map((el, idx) => (
        <div key={idx}>
          <St.FilterItem
            onClick={() => {
              // 배열의 특정 요소 update
              const temp = [...filterOpen];
              temp[idx] = !temp[idx];
              setFilterOpen(temp);
            }}
          >
            {el}
            <St.ArrowIcon
              src="src/assets/arrow.svg"
              $filterOpen={filterOpen[idx]}
            />
          </St.FilterItem>
          <NavBarFilter
            filterOpen={filterOpen[idx]}
            filterIdx={idx}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
          <St.Line />
        </div>
      ))}
    </St.Wrapper>
  );
};

export default NavBar;

const St = {
  Wrapper: styled.ul`
    width: 26.4rem;
  `,
  NavTitle: styled.div`
    display: flex;
    justify-content: space-between;

    font-size: 2rem;
    font-weight: 700;
  `,
  RefreshBtn: styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  `,
  BoldLine: styled.div`
    width: 100%;
    height: 0.1rem;
    margin: 2rem 0rem;
    background-color: white;
  `,
  FilterItem: styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    font-weight: 600;
    cursor: pointer;

    & > i {
      font-size: 1.6rem;
      font-style: normal;
    }
  `,
  Line: styled.div`
    width: 100%;
    height: 0.05rem;
    margin: 2rem 0rem;
    background-color: ${({ theme }) => theme.colors.purple1};
  `,
  ArrowIcon: styled.img<{ $filterOpen: boolean }>`
    width: 2rem;
    ${({ $filterOpen }) => $filterOpen && "transform: scaleY(-1);"}
  `,
};
