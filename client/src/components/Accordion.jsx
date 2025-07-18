import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TaskCard } from './TaskCard';

export default function AccordionUsage({ expanded, data, title, icon, color, textColor }) {
  const isTask = data?.length > 0

  return (
      <Accordion 
        defaultExpanded={expanded}
        sx={{ 
          backgroundColor: 'transparent', // Fondo del acordeón
          border: '1px solid #3f3f46', 
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ 
            backgroundColor: color, 
            color: textColor,
            padding: '5px 20px',
            '&:hover': { opacity: '70%' } ,
          }}
        >
          <Typography  sx={{ fontWeight: 'bold' }} component="span">
            <div className='flex items-center gap-x-3 text-lg'>
              {icon}
              {title}
              <span style={{ backgroundColor: textColor }} className='text-xs font-bold px-3 text-white py-1 rounded-full'>{data.length}</span>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ 
            padding: '15px', 
            backgroundColor: 'transparent' ,
          }}
        >
          <div className='flex flex-wrap gap-4'>
            
            {
              isTask ? 
              data?.map((task) => {
                return (
                  <TaskCard task={task} key={task.id_task}/>
                )
              })
              : <h1 className='text-zinc-400 font-semibold'>No hay tareas</h1>
            }
          </div>
        </AccordionDetails>
      </Accordion>    
  );
}
