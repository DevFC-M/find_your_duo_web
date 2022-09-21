import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Forms/Input';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState, FormEvent } from 'react';
import { SelectGame } from './Forms/SelectGame';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import * as Select  from '@radix-ui/react-select';

interface Game {
    title: string;
    id: string;
}

export function CreateAdModal() {

  const [games, setGames] = useState <Game[]>([]);
  const [weekDays,  setWeekDays] = useState<string[]>([]);
  const [gamesSelect, setGamesSelect] = useState("");
  const [useVoiceChannel, setUserVoiceChannel] = useState(false);

  useEffect(() => {
      axios('http://localhost:19001/games').then(response => {
          setGames(response.data);
        })
    }, []);

  async function handleCreateAd(event : FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)

    const data = Object.fromEntries(formData);
    
    if(!data.name) {
      return;
    }

    try { 
      await axios.post(`http://localhost:19001/games/${gamesSelect}/ads`, {
        name: data.name, 
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number), 
        hourStart: data.hoursStart, 
        hourEnd: data.hoursEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anuncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar anúncio');
    }
  } 

  return (

    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
              <Select.Root onValueChange={setGamesSelect}>
                <Select.SelectTrigger
                  id="name"
                  name="game"
                  aria-label="Game"
                  className={`bg-zinc-900 py-3 px-4 rounded text-small flex justify-between text-sm items-center ${gamesSelect ? "text-white" : "text-zinc-500"}`}
                >
                  <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
                  <Select.SelectIcon>
                    <CaretDown size={24} className="text-zinc-400" />
                  </Select.SelectIcon>
                </Select.SelectTrigger>
                <SelectGame games={games} id={setGamesSelect}/>
              </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input name="discord" id="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className= "flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item 
                  value="0"
                  className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Domingo"
                  >
                    D
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="1"
                  className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Segunda"
                  >
                    S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="2"
                  className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Terça">
                    T
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="3"
                  className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Quarta">
                    Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="4"
                  className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Quinta">
                    Q
                  </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5" 
                  className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Sexta">
                    S
                  </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="6"
                  className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                  title="Sexta">
                    S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className= "flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart">Qual horário do dia</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" name="hoursStart" id="hoursStart" placeholder="De"/>
                <Input type="time" name="hoursEnd" id="hoursEnd" placeholder="Até"/>
              </div>
            </div>
          </div>
          
          <label className="mt-2 flex gap-2 text-sm items-center ">
            <Checkbox.Root 
              className="w-6 h-6 rounded bg-zinc-900 p-1"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUserVoiceChannel(true);
                } else {
                  setUserVoiceChannel(false);
                }
              }}
            > 
                <Checkbox.Indicator>
                    <Check 
                        className="w-4 h-4 text-emerald-400"
                    />
                </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar no chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close 
              type="button" 
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold"
            >
                Cancelar
            </Dialog.Close>
            <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24}/>
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}