import React from 'react';
import CollapseWrapper from '../components/advancedHooks/CollapseWrapper';
import UseRefExample from '../components/advancedHooks/UseRefExample';
import HocExample from '../components/advancedHooks/HocExample';
import ReactChildrenExample from '../components/advancedHooks/ReactChildrenExample';

const HooksView = () => {
  return (
    <>
      <CollapseWrapper title={'useRef'}>
        <UseRefExample />
      </CollapseWrapper>
      <CollapseWrapper title={'HOC'}>
        <HocExample />
      </CollapseWrapper>
      <CollapseWrapper title={'React Children'}>
        <ReactChildrenExample />
      </CollapseWrapper>
    </>
  );
};

export default HooksView;
