using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ChiTiet
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //return await _dataContext.Activity.FindAsync(request.Id);
                var activity = await _dataContext.Activity.FindAsync(request.Id);

                if (activity == null)
                {
                    return Result<Activity>.Failure("Not found");
                }

                return Result<Activity>.Success(activity);
            }
        }
    }
}
