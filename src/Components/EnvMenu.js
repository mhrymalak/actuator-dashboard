import React, { useState} from "react";
import Options from '../Components/Options';

const EnvMenu = ({ updateAppData, environments, isLoading }) => {
    const [chosen, setChosen] = useState();
    return (
        <div className='menu'>
          { 
            environments.map((env) =>
              <Options
                key={ env }
                env={ env }
                isLoading={ isLoading }
                updateAppData={ updateAppData }
                active={ env===chosen }
                setActive={ ()=>setChosen(env) }
              />
            )
          }
        </div>
    );
}

export default EnvMenu;