import './packages/nanum-square-round-otf/index.css';
import './packages/d2coding/index.css';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const font_data = require('./fonts.json');
const options = font_data.map((font, i) => ({ value: i, label: font[1] }));

const App = () => {
  const [loading, set_loading] = useState(true);
  const [index, set_index] = useState(
    Number(Math.random() * (options.length - 1)) | 0,
  );
  const [font_family, set_font_family] = useState(font_data[index][1]);
  useEffect(() => {
    import(`./packages/${font_data[index][0]}/index.css`)
      .then(() => {
        set_loading(true);
        document.fonts.load(`1.2rem ${font_data[index][1]}`).then(() => {
          set_font_family(font_data[index][1]);
          set_loading(false);
        });
      })
      .catch(e => console.error(e));
  }, [index]);
  const change_index = selectedOption => {
    set_index(selectedOption.value);
  };
  return (
    <main style={{ margin: 'auto', width: '80%' }}>
      <h1 style={{ fontFamily: '나눔스퀘어라운드OTF' }}>@kfonts</h1>
      <p style={{ fontFamily: '나눔스퀘어라운드OTF' }}>
        무료 배포된 한글 폰트를 편리하게 self-hosting 하시고, 웹 사이트에
        적용해보세요!
      </p>
      <Select
        defaultValue={options[index]}
        onChange={change_index}
        options={options}
      />
      <br />
      {loading ? (
        <p style={{ fontFamily: '나눔스퀘어라운드OTF', textAlign: 'center' }}>
          로딩중
        </p>
      ) : (
        <>
          <textarea
            style={{
              width: 'calc(100% - 2rem)',
              height: '150px',
              padding: '1rem',
              fontFamily: font_family,
              fontSize: '1.2rem',
            }}
            placeholder={`글꼴 ${font_family} 체험가능!`}
          />
          <br />
          <h2 style={{ fontFamily: '나눔스퀘어라운드OTF' }}>설치</h2>
          <p style={{ fontFamily: '나눔스퀘어라운드OTF' }}>
            npm을 사용하신다면
          </p>
          <pre
            style={{
              fontFamily: 'D2Coding',
              padding: '1rem',
              backgroundColor: '#444',
              color: '#fff',
            }}
          >
            $ npm install --save @kfonts/{font_data[index][0]}
          </pre>
          <p style={{ fontFamily: '나눔스퀘어라운드OTF' }}>
            yarn을 사용하신다면
          </p>
          <pre
            style={{
              fontFamily: 'D2Coding',
              padding: '1rem',
              backgroundColor: '#444',
              color: '#fff',
            }}
          >
            $ yarn add @kfonts/{font_data[index][0]}
          </pre>
          <h2 style={{ fontFamily: '나눔스퀘어라운드OTF' }}>사용</h2>
          <p style={{ fontFamily: '나눔스퀘어라운드OTF' }}>React를 예로 들면</p>
          <pre
            style={{
              fontFamily: 'D2Coding',
              padding: '1rem',
              backgroundColor: '#444',
              color: '#fff',
            }}
          >{`\
import '@kfonts/${font_data[index][0]}';

const Title = (text) => <h1 style={{fontFamily: '${font_family}'}}>{text}</h1>;
`}</pre>
        </>
      )}
    </main>
  );
};

export default App;
