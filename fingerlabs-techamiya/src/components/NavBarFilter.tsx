import { useState } from "react";
import { styled } from "styled-components";
import TRAITS from "../data/traits";

interface NavBarFilterProps {
  filterOpen: boolean;
  filterIdx: number;
  checkedList: string[][];
  setCheckedList: React.Dispatch<React.SetStateAction<string[][]>>;
}

const NavBarFilter = ({
  filterOpen,
  filterIdx,
  checkedList,
  setCheckedList,
}: NavBarFilterProps) => {
  // 각 trait을 FILTER[filterIdx]로 접근하기 때문에, key를 제외하고 value들로 이루어진 배열 생성하여 렌더링
  const FILTER = Object.values(TRAITS);
  const [isChecked, setChecked] = useState<boolean[]>(
    Array.from({ length: FILTER[filterIdx].length }, () => false)
  );

  const toggleFilter = (el: string, idx: number) => {
    // isChecked 배열 update
    const temp = [...isChecked];
    temp[idx] = !temp[idx];
    setChecked(temp);

    // 체크된 속성을 관리하는 checkedList의 해당하는 필터 종류에 체크한 속성 추가
    const newCheckedList = [...checkedList];
    if (checkedList[filterIdx].includes(el)) {
      // 체크 해제
      newCheckedList[filterIdx].splice(
        newCheckedList[filterIdx].indexOf(el),
        1
      );
      setCheckedList(newCheckedList);
      return;
    }
    // 체크 추가
    newCheckedList[filterIdx].push(el);
    setCheckedList(newCheckedList);
  };

  return (
    <St.Wrapper $filterOpen={filterOpen}>
      {FILTER[filterIdx].map((el, idx) => (
        <St.TraitItem key={idx}>
          <St.CheckBox
            $isItemChecked={isChecked[idx]}
            onClick={() => toggleFilter(el, idx)}
          >
            ✓
          </St.CheckBox>
          <span>{el}</span>
        </St.TraitItem>
      ))}
    </St.Wrapper>
  );
};

export default NavBarFilter;

const St = {
  Wrapper: styled.ul<{ $filterOpen: boolean }>`
    display: ${({ $filterOpen }) => ($filterOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 1.5rem;

    margin: 1.5rem 0rem;
    max-height: 32rem;
    overflow: scroll;

    /* 스크롤바 숨기기 */
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  TraitItem: styled.li`
    display: flex;

    & > span {
      font-size: 1.6rem;
      font-weight: 300;
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  CheckBox: styled.div<{ $isItemChecked: boolean }>`
    text-align: center;

    margin-right: 1.5rem;
    width: 1.8rem;
    height: 1.8rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.purple1};
    border-radius: 0.3rem;
    background-color: ${({ $isItemChecked, theme }) =>
      $isItemChecked ? theme.colors.pink : theme.colors.bg};

    font-size: 2rem;
    color: ${({ $isItemChecked, theme }) =>
      $isItemChecked ? "white" : theme.colors.bg};
    cursor: pointer;
  `,
};
