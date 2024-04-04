export default function Buttons({ voltar, isLoading }) {
  return (
    <div className='flex justify-center mt-5'>
      <button
        className='border-solid border-2 text-white rounded-md px-5 py-1 mr-3 bg-gray-400 hover:bg-gray-500'
        onClick={voltar}
        type="button"
      >Voltar
      </button>

      <button
        className='border-solid border-2 text-white rounded-md px-5 py-1 bg-emerald-500 hover:bg-emerald-600'
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Salvar'}
      </button>
    </div>
  )
}
