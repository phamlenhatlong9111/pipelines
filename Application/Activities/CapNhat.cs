using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CapNhat
    {
        public class Command : IRequest
        {
            public Activity Entity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //throw new NotImplementedException();

                var activity = await _dataContext.Activity.FindAsync(request.Entity.Id);
                _mapper.Map(request.Entity, activity);

                //activity.Title = request.Entity.Title ?? activity.Title;
                //activity.Content = request.Entity.Content ?? activity.Content;

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
