using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Entity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //RuleFor(x => x.Title).NotEmpty().WithMessage("chi la ri");
                RuleFor(x => x.Entity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _dataContext.Activity.Add(request.Entity);
                var result = await _dataContext.SaveChangesAsync() > 0;

                if(!result)
                {
                    return Result<Unit>.Failure("Create error");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
