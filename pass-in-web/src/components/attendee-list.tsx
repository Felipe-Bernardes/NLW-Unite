import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './Table/table'
import { TableHeader } from './Table/table-header'
import { TableCell } from './Table/table-cell'
import { TableRow } from './Table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    function goToNextPage() {
        setPage(page + 1)
    }


    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 p-3 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChange} placeholder="Buscar participantes..." className="bg-transparent flex-1 outline-none text-sm border-0 p-0" />
                </div>

                {search}
            </div>
                <Table>
                    <thead>
                        <tr className='border-b border-white/10'>
                            <TableHeader style={{width: 48}}>
                                <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10 '/>
                            </TableHeader>
                            <TableHeader className='py-3 px-4 text-sm font-semibold text-left'>Código</TableHeader>
                            <TableHeader className='py-3 px-4 text-sm font-semibold text-left'>Participante</TableHeader>
                            <TableHeader className='py-3 px-4 text-sm font-semibold text-left'>Data de Inscrição</TableHeader>
                            <TableHeader className='py-3 px-4 text-sm font-semibold text-left'>Data de Check-In</TableHeader>
                            <TableHeader className='py-3 px-4 text-sm font-semibold text-left' style={{width: 64}}></TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.slice((page - 1) * 10, (page + 1) * 10).map((attendee) => {
                            return (
                            <TableRow key={attendee.id}>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'><input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10 '/></TableCell>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>{attendee.id}</TableCell>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>
                                    <div className='flex flex-col gap-1'>
                                        <span className='font-semibold text-white'>{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>{dayjs().to(attendee.CheckedInAt)}</TableCell>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>
                                    <IconButton transparent> <MoreHorizontal className='size-4'/> </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <TableCell colSpan={3}> Mostrando 10 de {attendees.length} itens </TableCell>
                            <TableCell  colSpan={3} className='text-right'>
                                <div className='inline-flex items-center gap-8'>
                                    <span>Página {page} de {Math.ceil(attendees.length / 10)}</span>
                                    <div className='flex gap-1.5'>
                                        <IconButton> <ChevronsLeft className='size-4'/>  </IconButton>
                                        <IconButton> <ChevronLeft className='size-4'/>   </IconButton>
                                        <IconButton onClick={goToNextPage}> <ChevronRight className='size-4'/>  </IconButton>
                                        <IconButton> <ChevronsRight className='size-4'/> </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                        </tr>
                    </tfoot>
                </Table>
        </div>
    )
} 