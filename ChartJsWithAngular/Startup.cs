using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ChartJsWithAngular.Startup))]
namespace ChartJsWithAngular
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
