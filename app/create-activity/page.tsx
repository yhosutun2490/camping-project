import React from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export const metadata = {
  title: '新增活動 | 森森不息',
  description: '在這裡新增您的露營活動，吸引更多人參與',
};

function CreateActivityPage() {
  return (
    <div className="">
      <CreateActivityForm />
    </div>
  );
}

export default CreateActivityPage;
