import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from './Header';
import { Load } from './Load';
import { FormContents } from './atom/FormContents';
import { FormDate } from './atom/FormDate';
import { FormButton } from './atom/FormButton';
import '../stylesheets/style.css';
import { edit_updateItem } from './Edit_UpdateItem';

export const IncompleteEdit = () => {
  const { handleSubmit, setValue, ...formMethods } = useForm({
    defaultValues: {
      name: '',
      date: '',
    },
  });

  useEffect(() => {
    Load((httpData) => {
      const date = new Date(httpData.date);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      // 元のTODO内容をフォームに表示
      setValue('name', httpData.name);
      // 元の日付をフォームに表示
      setValue('date', formattedDate);
    });
  }, [setValue]);
  
  const handleOnSubmit = () => {
    edit_updateItem(false);
  }

  return (
    <>
    <Header />
    <main>
      <div className="container">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="area">
            <FormContents formMethods={formMethods}/>
            <FormDate title="完了予定日" formMethods={formMethods}/>
            <FormButton/>
          </div>
        </form>
      </div>
    </main>
    </>
  );
};