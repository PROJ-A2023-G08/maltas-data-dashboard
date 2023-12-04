import { useState } from 'react';
import { User } from '../../../lib/types';
import Select, { GroupBase } from 'react-select';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import { useMUpdateUserProfileMutation } from "../../../lib/mutations";

interface LanguageSettingsProps {
  user?: User;
}

const LanguageSettingsPage: React.FC<LanguageSettingsProps> = (props) => {
  const mutation = useMUpdateUserProfileMutation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(props.user?.language || 'English');
  const router = useRouter();

  interface OptionsType {
    label: string;
    value: string;
  }

  function extractValue(optionsObject: OptionsType | undefined): string {
  
    if (optionsObject?.value) {
      return optionsObject.value;
    } else {
      
      return ""; 
    }
  }
  

  const handleUpdateNotifications = (value: string) => {
    try {
      mutation.mutate(
        {
          email: props?.user?.email,
          language: value,
        },
        {
          onSuccess: () => {
            toast("Profile Updated Succesfully", {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              type: "success",
            });

               const lanCode = getValueFromLabel(value);
        
             router.push(`/${lanCode}`);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const languages: unknown = [
    { label: 'English', value: 'English' },
    { label: 'Finnish', value: 'Finnish' },
    { label: 'Swedish', value: 'Swedish' },
  ];

  

  function getValueFromLabel(label: string) {
    const normalizedLabel = label.toLowerCase();
  
    switch (normalizedLabel) {
      case 'english':
        return 'en';
      case 'finnish':
        return 'fi';
      case 'swedish':
        return 'sv';
      default:
        return "en";
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Languages</h1>
      <div className="w-full">
        <Select
              defaultInputValue={selectedLanguage as string}
              placeholder="Select language"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  height: "50px",
                  flex: 1,
                  paddingLeft: "5px",
                  backgroundColor: "rgb(249 250 251)",
                  borderColor: state.isFocused
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "rgba(102, 178, 255, 0.6) 0px 0px 0px 0.5px",
                  },
                }),
              }}
              name="country"
              options={languages as GroupBase<string>[]}
              value={selectedLanguage}
              onChange={(value)=>{
                if(value){
                  setSelectedLanguage(value);
                  const newValue:unknown = value
                  handleUpdateNotifications(extractValue(newValue as OptionsType));
                }     
              }}
            />
      </div>
    </div>
  );
};

export default LanguageSettingsPage;
