import { React } from 'react';
import { useForm } from 'react-hook-form';
import { Header} from './Header';
import { addItem } from './PostItem';
import { FormContents } from './FormContents';
import { FormDate } from './FormDate';
import { FormButton } from './FormButton';
import '../stylesheets/style.css';

export const Addtext = () => {
  const { handleSubmit, ...formMethods } = useForm(); //useFormフックから返されるオブジェクトを分割代入

  const handleOnSubmit = () => {
    addItem();
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