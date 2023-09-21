[ skill ] 

- React, TS, Vite, StyledComponent
- React Intersection Observer (for 무한스크롤)

[ 컴포넌트 ]

App.tsx > Gallery.tsx > 

- NavBar.tsx(여러 필터로 구성된 사이드바) > NavBarFilter.tsx (각 필터의 드롭다운)
- CardGallery.tsx (여러 NFT카드로 구성된 Grid) > Card.tsx (NFT 카드 하나)

[ 구현 기능 ]

1. 퍼블리싱 
    - [x]  카드 컴포넌트
    - [x]  Grid 갤러리
    - [x]  필터 NavBar
2. 데이터 연결 
    - [x]  컨트랙트 연결해서 1000개 데이터 불러오기
    - [x]  카드 컴포넌트 mapping
    - [x]  NavBar의 필터 종류 traits.json 활용
3. 필터링 기능 
    - [x]  NavBar 드롭다운 구현
    - [x]  드롭다운 영역 제한하여 내부 드래그 발생
    - [x]  체크 toggle 함수 사용 (체크할 때마다 갤러리 리렌더링)
4. 검색 기능 
    - [x]  onChange로 반응해서 자동 검색 및 리렌더링
    - [x]  입력한 value가 미야 이름 string에 includes 되어있는지 판단하여 .filter()
    - [x]  숫자 아니면 입력 안되도록
    - [x]  최대 4자리 까지만 가능
5. 무한 스크롤 
    - [x]  react-intersection-observer 라이브러리 사용
    - [x]  9개씩 끊어서 나타나도록
6. 그 외 
    - [x]  fade in 애니메이션
    - [x]  NavBar 상단에 새로고침 버튼

---
[ 구현 보고서 ]  
- index
  - [데이터페칭](https://github.com/lydiacho/techaMiya/tree/main#데이터-페칭)
  - [필터링](https://github.com/lydiacho/techaMiya/tree/main#필터링)
  - [무한스크롤](https://github.com/lydiacho/techaMiya/tree/main#무한스크롤)
  - [검색기능](https://github.com/lydiacho/techaMiya/tree/main#검색-기능)

### 데이터 페칭

▶️ `useGetMiya.ts` 커스텀훅 

처음엔 무한스크롤을 통한 성능 개선을 위해 1000개의 데이터를 최초에 모두 불러오는 것이 아닌, 사용자의 스크롤에 따라 9개씩 끊어서 불러오려고 하였으나 여러 방면에서 문제가 발생함에 따라 최초에 토큰 1000개를 모두 불러오는 방식으로 최종 결정하였다. 

처음엔 0000번 부터 0999번까지 순서대로 불러오고자 하여 아래와 같이 연쇄적으로 토큰을 하나씩 불러와서 data에 추가하였다. 

```jsx
useEffect(() => {
	if (data.length < 1000) {
		miya
	    .tokenURI(data.length)
	    .then(fetch)
	    .then((res) => res.json())
	    .then((json) => JSON.stringify(json, null, 2))
	    .then((json) => JSON.parse(json))
	    .then((res) => {
	      setData((prev) => [...prev, res]);
	    });
	}
},[data]);
```

그러나 이렇게 하나씩 불러올 경우 최초에 데이터를 불러오는 렌더링이 너무나도 오래걸리고, 심지어 1000개가 모두 불러와지기 전까지는 검색기능 및 필터링 기능이 모두 작동되지 않았기 때문에 반드시 초기렌더링 시간을 줄여야만했다. 

따라서 토큰번호의 정렬을 포기하고 아래와 같이 for문을 통해 1000개의 데이터를 불러오는 방식으로 변경하였고, 1000개의 데이터를 불러오는 속도는 약 30배 개선될 수 있었다. (기존 : 약 30초, 현재 : 1초 이하)

```jsx

const useGetMiya = () => {
  const [data, setData] = useState<MetaDataType[]>([]);
  const miya = new ethers.Contract(
    techaMiyaContractAddress,
    techaMiyaABI,
    provider
  );

  useEffect(() => {
    setData([]);
    for (let i = 0; i < 1000; i++) {
      miya
        .tokenURI(i)
        .then(fetch)
        .then((res) => res.json())
        .then((json) => JSON.stringify(json, null, 2))
        .then((json) => JSON.parse(json))
        .then((res) => {
          setData((prev) => [...prev, res]);
        });
    }
  }, []);

  return data;
};
```

---

### 필터링

▶️ `Gallery.tsx`

- 필터별 체크된 속성 값를 저장하는 이중배열

```jsx
// 필터 카테고리 수 : 13가지 
const [checkedList, setCheckedList] = useState<string[][]>(
  Array.from({ length: 13 }, () => [])
);
```

▶️ `NavBar.tsx` 

```jsx
<NavBarFilter
	filterOpen={filterOpen[idx]}
	filterIdx={idx}
	checkedList={checkedList}
	setCheckedList={setCheckedList}
/>
```

▶️ `NavBarFilter.tsx`

- props : checkedList, setCheckedList (필터별 체크된 속성값을 가지는 데이터)
- isChecked : 특정 필터의 각 속성들의 선택 여부를 관리하는 배열. (체크박스 style에 쓰임)
    1. 체크박스 클릭 시, isChecked의 해당 속성 요소를 toggle & toggleFilter 실행
- toggleFilter : 체크박스 클릭 시 checkedList를 업데이트 하는 toggle 함수
    1. 만약 checkedList의 해당 필터 배열에 클릭한 속성값이 이미 있다면 → 필터 배열에서 요소 삭제 
    2. 없다면 → 필터 배열에 요소 추가

```jsx
import TRAITS from "../data/traits";

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

  const toggleFilter = (el: string) => {
		// 1.
    const temp = [...isChecked];
    temp[idx] = !temp[idx];
    setChecked(temp);

    const newCheckedList = [...checkedList];
		// 3. 
    if (checkedList[filterIdx].includes(el)) {
      newCheckedList[filterIdx].splice(
        newCheckedList[filterIdx].indexOf(el),
        1
      );
      setCheckedList(newCheckedList);
      return;
    }
    // 2.
    newCheckedList[filterIdx].push(el);
    setCheckedList(newCheckedList);
  };

  return (
    <St.Wrapper $filterOpen={filterOpen}>
      {FILTER[filterIdx].map((el, idx) => (
        <St.TraitItem key={idx}>
          <St.CheckBox
            $isItemChecked={isChecked[idx]}
            onClick={() => {
              toggleFilter(el);
            }}
          >
            ✓
          </St.CheckBox>
          <span>{el}</span>
        </St.TraitItem>
      ))}
    </St.Wrapper>
  );
};
```

▶️ `CardGallery.tsx`

- props : checkedList (체크된 필터 데이터)

```jsx
const DATA = useGetMiya();  // 1000개의 미야 데이터
const [data, setData] = useState<MetaDataType[]>([]);   // 화면에 렌더링할 미야 데이터

```

- API를 통해 불러온 1000개의 미야 데이터 중 **검색한 내용**과 **적용한 필터** 모두를 만족시키는 미야만 필터링하여 data에 저장
    1. 필터 적용 : 
        - 모든 필터를 순회하면서 한 필터에 대해서라도 false면 해당 미야 제외
            - 아무런 속성을 선택하지 않았거나, 선택된 속성에 미야가 해당된다면 → true

```jsx
useEffect(() => {
	setData(
	  //%search% 검색
	  DATA.filter((miya) => search === "" || miya.name.includes(search))
	    // 1.
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
}, [search, checkedList]);
```

---

### 무한스크롤

처음엔 데이터 패칭을 최적화하기 위해 1000개를 한꺼번에 패칭하는 것이 아닌, 9개씩 나눠서 패칭하는 방식으로 구현했다. 하지만 그럴 경우, 리스트 상단의 아이템 수도 전체 데이터가 아닌 현재까지 불러와진 데이터 수만 표시하는 문제와 필터 적용 시 정상적으로 필터링이 작동되지 않는 문제가 발생하여, 1000개의 데이터를 한번에 패칭해오되, 화면에 렌더링할 때만 사용자의 스크롤에 따라 9개씩 나눠서 표시하는 방법으로 변경하였다. 

▶️ `CardGallery.tsx`

```jsx
const [data, setData] = useState<MetaDataType[]>([]);   // 화면에 렌더링할 미야 데이터
const containerRef = useRef<HTMLElement | null>(null);  // DOM을 지정하여 애니메이션을 적용하기 위한 useRef

const [ref, inView] = useInView();  
const [page, setPage] = useState(1);  // 9개씩 묶었을 때 몇번째 묶음인지를 의미하는 page state
```

- inView : ref로 지정한 DOM이 사용자의 뷰포트에 들어갈 경우 true.  (즉, 사용자가 스크롤하다가 ref에 도달할 경우)
- 사용자가 ref에 도달했을 때, page 수 1 추가 (보여줄 NFT를 9개 추가)

```jsx
useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);
```

- 9개씩 나눠서 현재 보여줄 페이지 수 (묶음 수)에 따라 렌더링

```jsx
<St.Container ref={containerRef}>
  {data
    // 9개씩 쪼개서 렌더링
    .filter((_, idx) => idx < 9 * page)
    .map((el, idx) => (
      <Card key={idx} name={el.name} image={el.image} />
    ))}
  <div ref={ref} />
</St.Container>
```

---

### 검색 기능

▶️ `CardGallery.tsx`

- 검색어가 빈 문자열이거나, 검색어가 미야의 이름에 포함되어있을 경우 (&search&)에 대해 필터링

```jsx
setData(DATA.filter((miya) => search === "" || miya.name.includes(search)))
```

- 글자 수 3자리까지 제한
    - 토큰 번호가 0~999이기 때문

```jsx
// 글자수 3자리까지 제한
  const handleTextLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 3) {
      setSearch(e.target.value.slice(0, 3));
    }
  };
```

- input에 number type을 줘서 숫자만 입력되도록 제한
    - input의 maxlength prop은 text type에만 적용이 가능하여 maxlength=”3”방법이 아닌 별도의 handler을 추가함

```jsx
<St.Search
  placeholder="Number"
  type="number"
  onChange={handleTextLength}
  value={search}
/>
```

---

[ 제한 시간 외에 추가적으로 개선 / 구현하고 싶은 부분 ]

- 모듈화 (함수 분리)
- 최적화 고민
- fadein 애니메이션, 새로고침 아이콘 spin animation
- 필터 카테고리, 각 NFT 카드, 검색창 hover 스타일 추가
- 렌더링 시마다 아이템 수 0부터 올라가는 효과
- NFT카드 로딩 시 skeleton UI
- toTop 버튼 (기존 선미야갤러리 오른쪽 하단에 있는)
