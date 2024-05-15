using Application.Core;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Application.JwtCommon
{
    public class SendMail
    {
        public class Query : IRequest<int>
        {
            public string EmailAddress { get; set; }
            public string Subject { get; set; }
            public string Content { get; set; }
        }
        public class Handler : IRequestHandler<Query, int>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                return 0;
            }

            
        }
    }
}
