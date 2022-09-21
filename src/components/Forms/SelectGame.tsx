import * as Select from '@radix-ui/react-select';
import { CaretDown, Check } from 'phosphor-react';
import { useState } from 'react';

interface SelectGameProps {
    games: any;
}

export function SelectGame(props: SelectGameProps) {

  const [gamesSelect, setGamesSelect] = useState("")

  return(
    <Select.Root onValueChange={setGamesSelect}>
      <Select.SelectTrigger
        id="game"
        name="game"
        aria-label="Game"
        className={`bg-zinc-900 py-3 px-4 rounded text-small flex justify-between ${
          gamesSelect ? "text-white" : "text-zinc-500"
        }`}
      >
        <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
        <Select.SelectIcon>
          <CaretDown size={24} className="text-zinc-400" />
        </Select.SelectIcon>
      </Select.SelectTrigger>
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
    </Select.Root>
  )
}