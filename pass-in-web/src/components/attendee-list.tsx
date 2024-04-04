import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './Table/table'
import { TableHeader } from './Table/table-header'
import { TableCell } from './Table/table-cell'
import { TableRow } from './Table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}

export function AttendeeList() {
    const [search, setSearch] = useState('')
    // const [page, setPage] = useState(1)
    const page = 1

    const [total, setTotal] = useState(0)
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const totalPages = Math.ceil(total / 10)

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

        url.searchParams.set('pageIndex', String(page - 1))

        if(search.length > 0) {
            url.searchParams.set('query', search)
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setAttendees(data.attendees)
            setTotal(data.total)
        })
    }, [page, search])


    function goToNextPage() {
        //setPage(page + 1)
        const searchParams = new URLSearchParams(window.location.search)

        searchParams.set('page', String(page + 1))
        window.location.search = searchParams.toString()
    }

    function goToPreviousPage() {
        //setPage(page - 1)
    }

    function goToFirstPage() {
        //setPage(1)
    }

    function goToLastPage() {
        // setPage(totalPages)
    }


    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
        //setPage(1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 p-3 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input 
                        onChange={onSearchInputChange} 
                        placeholder="Buscar participantes..." 
                        className="bg-transparent flex-1 outline-none text-sm border-0 p-0 focus:ring-0" 
                    />
                </div>

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
                        {attendees.map((attendee) => {
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
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>
                                    {
                                        attendee.checkedInAt === null 
                                        ? <span className='text-zinc-400'>Não Fez Check-IN</span>
                                        : dayjs().to(attendee.checkedInAt)
                                    }
                                </TableCell>
                                <TableCell className='py-3 px-4 text-sm text-zinc-300'>
                                    <IconButton transparent> <MoreHorizontal className='size-4'/> </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <TableCell colSpan={3}> Mostrando {attendees.length} de {total} itens </TableCell>
                            <TableCell  colSpan={3} className='text-right'>
                                <div className='inline-flex items-center gap-8'>
                                    <span>Página {page} de {totalPages}</span>
                                    <div className='flex gap-1.5'>
                                        <IconButton onClick={goToFirstPage} disabled={page === 1}> <ChevronsLeft className='size-4'/>  </IconButton>
                                        <IconButton onClick={goToPreviousPage} disabled={page === 1}> <ChevronLeft className='size-4'/>   </IconButton>
                                        <IconButton onClick={goToNextPage} disabled={page === totalPages}> <ChevronRight className='size-4'/>  </IconButton>
                                        <IconButton onClick={goToLastPage} disabled={page === totalPages}> <ChevronsRight className='size-4'/> </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                        </tr>
                    </tfoot>
                </Table>
        </div>
    )
} 