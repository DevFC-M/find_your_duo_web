import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
    return (
        <div className="pt-1 bg-duo-gradient self-stretch rounded-lg mt-8 overflow-hidden">
        <div className="bg-[#2A2634] py-6 px-8 flex justify-between items-center">
          <div>
            <strong className="block text-2xl text-white font-black ml-8">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 ml-8 block">Publique um anúncio para encontrar novos players!</span> 
          </div>

          <button className="py-3 px-4 hover:bg-violet-600 bg-violet-500 rounded text-white font-medium flex items-center gap-3">
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </button>

        </div>

      </div>
    )
}