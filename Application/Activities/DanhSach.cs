using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class DanhSach
    {
        public class Query : IRequest<Result<List<Domain.Activity>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Domain.Activity>>>
        {
            private readonly IConfiguration _configuration;
            private readonly DataContext _context;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;

            }

            public async Task<Result<List<Domain.Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var lstResult = await _context.Activity.ToListAsync<Domain.Activity>();

                return Result<List<Domain.Activity>>.Success(lstResult);
            }
        }
    }
}
