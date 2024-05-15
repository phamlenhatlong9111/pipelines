using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Domain.Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
        }
    }
}
