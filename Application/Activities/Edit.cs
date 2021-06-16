using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
//Here we update our activity with the title from our request body,
// or with the old the title is no new titles is in the request
                activity.Title = request.Activity.Title ?? activity.Title;
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}