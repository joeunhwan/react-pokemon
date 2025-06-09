import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { formatPokemonData } from "../utils/pokemon-helper";
import Loader from "./Loader";

// type을 props로 전달 받도록 합니다
const PokemonsContainer = ({ type }) => {
  // 포켓몬 리스트 상태관리
  const [pokemonList, setPokemonList] = useState([]);
  // loading 상태 관리
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    /*  선택된 포켓몬 타입으로 해당 타입을 가진 포켓몬 데이터를 불러오는 API */
    // example types dragon, normal , fighting, flying
    const API_END_POINT = `https://pokeapi.co/api/v2/type/${type}`;

    // API 응답에서 pokemon 리스트를 가져오고 리스트 내부의 pokemon 요소를 이용하여 detail 정보를 담은 리스트를 생성합니다.
    // 노션 참조

    /**
     * javascript array의 map을 사용하여 pokemon들의 데이터를
     * 포켓몬 데이터 포멧(정규화 작업)을 위해서는
     * @formatPokemonData 함수를 사용하세요.
     * ../utils/pokemon-helper.js 에서 확인하세요.
     */
    setLoading(true);
    try {
      const response = await fetch(API_END_POINT);
      const json = await response.json();
      // console.log(json); // 1 콘솔에서 pokemon 확인 / 2 pokemon 에 접근해서 내용 가져오기 pokemon.name pokemon.url / 3 slot은 안쓰는 느낌

      // const detail = await fetch(json.pokemon[0].url);
      // console.log(detail); // 안나옴 확인이 안됨

      // 콘솔에 map 오류 떠서 map으로 넣어봄 //
      const pokeDetail = json.pokemon.map(async (p) => {
        const detailRes = await fetch(p.pokemon.url);
        const json2 = await detailRes.json();
        return formatPokemonData(json2);
      });

      const detailSuccess = await Promise.all(pokeDetail);
      setPokemonList(detailSuccess);
    } catch (error) {
      console.error("error", error);
    } finally {
      // API를 호출하는 동안 로더 컴포넌트를 보여줍니다.
      // <Loader/>
      setLoading(false);
    }
  };

  // 질문 할 내용 정리
  // 1. API_END_POING에서 데이터를 가져와서 JSON 변환 후 유틸 함수 pokemon-helper.js의 formatPokemonData() 에 한번 걸러야 하는걸로 생각됨
  // 2. 변환한 데이터를 콘솔에 출력하여 콘솔 찍어보니 pokemon에 name, url 두개 나옴
  // 3. url이 있으니 이걸 또 JSON 변환해야 하는 것 같은데 formatPokemonData(json) 넣어보니 map 오류가 뜨는데 이유를 모름
  // 4. 일단 상세정보 열어야 하니 pokemon.url 을 찍으면서 map 오류가 뜨니 map을 한번 넣어보면서 JSON 변환 했더니 비동기 오류? 같이 주소가 정의가 안됐다고 뜸
  // 5. 프로미스로 일단 묶고 안에서 다 처리 후 마지막에 setPokemonList에 담기게 해둠 = 포켓몬 카드가 나옴... 중간과정 이해 불가
  // 6. 때려 맞춰서 되었다보니..  이해가 필요

  useEffect(() => {
    fetchPokemons();
  }, [type]);

  return (
    <div className="pokemons-container">
      {loading ? (
        <Loader />
      ) : (
        pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default PokemonsContainer;
