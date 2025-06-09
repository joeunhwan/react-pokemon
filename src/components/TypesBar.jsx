import { useState, useEffect } from "react";
import { getTypeIconSrc } from "../utils/pokemon-helper";

// API로 포켓몬 타입을 받아온 후, 화면에 타입들을 보여주는 컴포넌트 입니다.
// 함수를 props로 받아와서 App.jsx의 type 상태를 바꿔봅시다.

const TypesBar = ({ setType }) => {
  const [pokeType, setPokeType] = useState([]);

  const fetchTypes = async () => {
    // API의 Response를 확인하고자 한다면 엔드포인트를 복사한 후, 브라우저에 붙여넣어보세요!
    /*  모든 포켓몬 타입들을 불러오는 API   */
    const API_END_POINT = `https://pokeapi.co/api/v2/type/`;

    /**
     * @필터
     *
     * 반환된 타입 데이터를 보면 몇가지 필요하지 않은 타입들이 있습니다.
     * 아래 필터 조건을 적용하여 필요한 타입만 남기세요.
     *
     * name !== 'unknown' && name !== 'shadow' && name !== 'stellar'
     *
     * hint: filter 함수를 사용하세요.
     */

    try {
      const response = await fetch(API_END_POINT);
      const json = await response.json();

      // console.log("fillter", json);

      // const filterType = json.results.filter(
      //   name !== "unknown" && name !== "shadow" && name !== "stellar"
      // );

      const filterType = json.results.filter(
        (item) =>
          item.name !== "unknown" &&
          item.name !== "shadow" &&
          item.name !== "stellar"
      );

      // setPokeType(json.results);
      setPokeType(filterType);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  // App.css에서 types-bar 스타일을 완성해주세요
  return (
    <nav className="types-bar">
      {pokeType.map((item) => {
        return (
          <a
            key={item.name}
            className={item.name}
            onClick={() => setType(item.name)}
            // setpoketype으로 안되서 아무거나 넣다가 app에 있는 settype 가져오니까 되는데요 이유를 모르겠습니다.. 위에 typesbar 함수에도 settype을 넣어두긴 했는데요 이것도 역시 이유를 모르겠습니다.
          >
            <img src={getTypeIconSrc(item.name)} alt={item.name} />
          </a>
        );
      })}
    </nav>
  );
};

export default TypesBar;
