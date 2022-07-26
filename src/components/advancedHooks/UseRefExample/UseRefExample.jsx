import { useRef } from 'react';

const UseRefExample = () => {
  const boxRef = useRef(null);

  const handleChangeBoxStyles = () => {
    boxRef.current.style.height = '150px';
    boxRef.current.style.width = '80px';
    boxRef.current.children[0].textContent = 'text';
  };

  return (
    <>
      <p className="mt-3">
        У вас есть блок, у которого заданы ширина и высота. Добавьте кнопку, при
        нажатии которой изменятся следующие свойства:
      </p>
      <ul>
        <li>Изменится содержимое блока на &quot;text&quot;</li>
        <li>высота и ширина станут равны 150 и 80 соответственно</li>
      </ul>

      <div
        className="bg-primary d-flex flex-row justify-content-center align-items-center rounded mb-3"
        ref={boxRef}
        style={{
          height: 40,
          width: 60,
          color: 'white',
        }}
      >
        <small>Блок</small>
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleChangeBoxStyles}
      >
        Изменить стили
      </button>
    </>
  );
};

export default UseRefExample;
