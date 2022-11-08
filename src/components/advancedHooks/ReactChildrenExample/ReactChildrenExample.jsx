import React from 'react';
import CollapseWrapper from '../CollapseWrapper';
import PropTypes from 'prop-types';
import Divider from '../../Divider/Divider';

const ComponentList = ({ children }) => {
  //   return React.Children.map(children, (child, i) => {
  //     const config = {
  //       ...child.props,
  //       num: i + 1,
  //     };

  //     return React.cloneElement(child, config);
  //   });
  return (
    <ol>
      {React.Children.map(children, child => {
        return <li>{React.cloneElement(child, { ...child.props })}</li>;
      })}
    </ol>
  );
};

ComponentList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const ReactChildrenExample = () => {
  return (
    <>
      <CollapseWrapper title={'Задание'}>
        <p className="mt-3">
          У вас есть компоненты Списка. Вам необходимо к каждому из них добавить
          порядковый номер, относительно того, как они располагаются на
          странице. Вы можете использовать как <code>React.Children.map</code>{' '}
          так и <code>React.Children.toArray</code>
        </p>
      </CollapseWrapper>
      <CollapseWrapper title={'Решение'}>
        <Divider />
        <ComponentList>
          <Component />
          <Component />
          <Component />
        </ComponentList>
      </CollapseWrapper>
    </>
  );
};

const Component = () => {
  // num
  return <div>Компонент списка</div>;
};

export default ReactChildrenExample;
