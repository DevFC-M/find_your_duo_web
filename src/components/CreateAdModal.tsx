import { Check, GameController } from 'phosphor-react';
import { Input } from './Forms/Input';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react';
import { SelectGame } from './Forms/SelectGame';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {

    const [games, setGames] = useState <Game[]>([]);

    useEffect(() => {
        fetch('http://localhost:19001/games')
          .then(response => response.json())
          .then(data => {
            setGames(data);
          })
      }, []);

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">

              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <SelectGame games={games}/>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className= "flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Domingo"
                      >
                        D
                      </button>
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Segunda"
                      >
                        S
                      </button>
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Terça">
                        T
                      </button>
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Quarta">
                        Q
                      </button>
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Quinta">
                        Q
                      </button>
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Sexta">
                        S
                      </button>
                    <button 
                      className="w-8 h-8 rounded bg-zinc-900" 
                      title="Sexta">
                        S
                      </button>
                  </div>
                </div>
                <div className= "flex flex-col gap-2 flex-1">
                  <label htmlFor="hoursStart">Qual horário do dia</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hoursStart" placeholder="De"/>
                    <Input type="time" id="hoursEnd" placeholder="Até"/>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 flex gap-2 text-sm items-center ">
                <Checkbox.Root className="w-6 h-6 rounded bg-zinc-900 p-1"> 
                    <Checkbox.Indicator>
                        <Check 
                            className="w-4 h-4 text-emerald-400"
                        />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar no chat de voz
              </div>

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