import * as Select from '@radix-ui/react-select';
import { CaretDown, Check } from 'phosphor-react';


interface SelectGameProps {
    games: any; 
    id: any;
}

export function SelectGame(props: SelectGameProps) {

  return(
        <Select.SelectPortal>
          <Select.SelectContent className="bg-zinc-900 rounded overflow-hidden">
            <Select.SelectScrollUpButton>
              <CaretDown size={24} className="text-zinc-400" />
            </Select.SelectScrollUpButton>
            <Select.SelectViewport className="py-2 px-1">
              <Select.SelectGroup>
                {props.games.map((game : any) => {
                  return (
                    <Select.SelectItem
                      key={game.id}
                      className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                      value={game.id}
                    >
                      <Select.SelectItemText>
                        {game.title}
                      </Select.SelectItemText>
                      <Select.SelectItemIndicator>
                        <Check size={24} className="text-emerald-500"/>
                      </Select.SelectItemIndicator>
                    </Select.SelectItem>
                  );
                })}
              </Select.SelectGroup>
            </Select.SelectViewport>
          </Select.SelectContent>
        </Select.SelectPortal>
  )
}